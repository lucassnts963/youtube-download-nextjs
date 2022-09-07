import React, { useEffect, useState } from "react";
import {
  Center,
  useColorMode,
  Tooltip,
  IconButton,
  SunIcon,
  MoonIcon,
  Image,
  HStack,
  Text,
  Link as NativeLink,
  Heading,
  Box,
  VStack,
  Input,
  Button,
  AspectRatio,
  Select,
} from "native-base";
import Link from "next/link";

import axios from "axios";

import { ColorModeSwitch } from "../src/components/ColorModeSwitch";
import Logo from "../src/assets/youtube.png";
import { api } from "../src/services/api";
import { useResultContext } from "../src/contexts/resultContext";

// Start editing here, save and see your changes.
export default function HomePage() {
  const source = axios.CancelToken.source();
  const resultContext = useResultContext();

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function isValid(url: string) {
    return true;
  }

  async function handleRequestInfo(url: string) {
    if (!isValid(url)) {
      return;
    }
    try {
      const result = await api.get(`/info?url=${url}`, {
        cancelToken: source.token,
      });
      const video = result.data;

      resultContext.updateResultState(video);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDownload() {
    setIsLoading(true);
    try {
      const result = await api.get(`/info?url=${url}`);
      const video = result.data;

      console.log(video);
      resultContext.updateResultState(video);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Center flex={1} _dark={{ bg: "gray.700" }} _light={{ bg: "gray.100" }}>
      <VStack w="full" px={5} space="md">
        <Image
          w={100}
          h={100}
          source={{ uri: Logo.src }}
          alt="Logo"
          alignSelf="center"
        />
        <Heading textAlign="center" mb={5}>
          YouTube Downloader
        </Heading>
        <Input
          w="full"
          placeholder="Informe uma url"
          borderColor="red.500"
          value={url}
          onChangeText={setUrl}
          _focus={{
            borderWidth: 2,
            borderColor: "red.600",
          }}
          _hover={{
            borderColor: "red.600",
          }}
          _input={{
            borderColor: "red.600",
          }}
        />
        <Select borderColor="red.500" defaultValue="video">
          <Select.Item label="Video" value="video" />
          <Select.Item label="Playlist" value="playlist" />
        </Select>
        <Button
          colorScheme="red"
          onPress={handleDownload}
          isLoading={isLoading}
        >
          Download
        </Button>
        {!!resultContext.data && (
          <Link href="/Details" passHref>
            <NativeLink>Escolha o Formato para Download</NativeLink>
          </Link>
        )}
      </VStack>
      <ColorModeSwitch />
    </Center>
  );
}
