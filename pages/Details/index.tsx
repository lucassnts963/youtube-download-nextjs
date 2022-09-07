import React, { useState } from "react";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Image,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Download, Plus } from "phosphor-react";

import { useResultContext } from "../../src/contexts/resultContext";

import { IconButton } from "../../src/components/IconButton";
import { FormatItemList } from "../../src/components/FormatItemList";

interface RenderItemProps {
  item: IFormat;
}

const renderItem = ({ item }: RenderItemProps) => (
  <FormatItemList data={item} />
);

export default function Details() {
  const { colors } = useTheme();
  const resultContext = useResultContext();

  const [isLoading, setIsLoading] = useState(false);

  const { data, updateResultState } = resultContext;

  const urlThumbnail = data?.videoDetails?.thumbnails[0].url;

  function handleDownload() {
    console.log("Download a Qualidade Padrão");
    setIsLoading(!isLoading);
  }

  return (
    <VStack flex={1} _dark={{ bg: "gray.700" }} _light={{ bg: "gray.100" }}>
      <Image
        source={{ uri: urlThumbnail }}
        alt={data?.videoDetails?.title}
        w="full"
        h={200}
      />
      <VStack p={5}>
        <Heading fontSize="lg">{data?.videoDetails?.title}</Heading>
        <Text mt={2} fontSize="sm">
          {data?.videoDetails?.viewCount} Views
        </Text>
        <HStack>
          <IconButton
            iconButton={<Download size={32} color={colors.red[500]} />}
            rounded="50%"
            onPress={handleDownload}
            isLoading={isLoading}
          />
          <IconButton
            iconButton={<Plus size={32} color={colors.red[500]} />}
            rounded="50%"
            onPress={() => console.log("Adicionar aos favoritos")}
          />
        </HStack>
        <Text>Links para Download de Videos</Text>
        <FlatList
          keyExtractor={item => item.url}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <Box borderBottomWidth={1} borderBottomColor="red.500" />
          )}
          data={data?.formats}
        />
      </VStack>
    </VStack>
  );
}
