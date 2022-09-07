import React, { useState } from "react";
import { HStack, Link, Progress, Text, useTheme, VStack } from "native-base";
import {
  SpeakerHigh,
  SpeakerSlash,
  VideoCamera,
  VideoCameraSlash,
  Download,
} from "phosphor-react";

import { api } from "../services/api";
import { useResultContext } from "../contexts/resultContext";

import { IconButton } from "./IconButton";

interface Props {
  data: IFormat;
}

export function FormatItemList({ data }: Props) {
  const { colors } = useTheme();

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const resultContext = useResultContext();

  const id = resultContext.data?.videoDetails?.videoId;

  function handleDownload() {
    setIsLoading(true);
    api
      .get(`/download/video?id=${id}&quality=${data.itag}`, {
        responseType: "blob",
        onDownloadProgress(progressEvent) {
          const { loaded } = progressEvent;

          const total = Number(data.contentLength);

          if (data.contentLength) {
            setProgress((loaded / total) * 100);
          }
        },
      })
      .then(response => {
        console.log(response);

        const blobURL = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["Content-Type"],
          })
        );

        const link = document.createElement("a");
        link.href = blobURL;
        link.setAttribute(
          "download",
          `${id}_${data.qualityLabel}.${data.container}`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <VStack p={2}>
      <HStack w="full" p={2}>
        <Text flex={1}>{data.container}</Text>
        <Text flex={1}>{data.qualityLabel}</Text>
        <Text flex={1}>{data.quality}</Text>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <IconButton
          iconButton={<Download size={32} color={colors.red[500]} />}
          iconSize={32}
          rounded="50%"
          onPress={handleDownload}
          isLoading={isLoading}
        />
        <HStack space={3}>
          {data.hasAudio ? (
            <SpeakerHigh size={25} color={colors.red[500]} />
          ) : (
            <SpeakerSlash size={25} color={colors.red[500]} />
          )}
          {data.hasVideo ? (
            <VideoCamera size={32} color={colors.red[500]} />
          ) : (
            <VideoCameraSlash size={32} color={colors.red[500]} />
          )}
        </HStack>
      </HStack>
      {!!progress && <Progress colorScheme="lime" value={progress} size="xs" />}
    </VStack>
  );
}
