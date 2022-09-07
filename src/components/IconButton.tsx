import React from "react";
import {
  IconButton as NativeIconButton,
  IIconButtonProps,
  Spinner,
} from "native-base";

interface Props {
  isLoading?: boolean;
  iconSize?: number;
  iconButton?: JSX.Element;
}

type IMyIconButton = IIconButtonProps & Props;

export function IconButton({
  isLoading = false,
  iconSize = 32,
  iconButton,
  ...rest
}: IMyIconButton) {
  return (
    <>
      {isLoading ? (
        <NativeIconButton
          icon={<Spinner size={iconSize} color="red.500" />}
          {...rest}
        />
      ) : (
        <NativeIconButton icon={iconButton} {...rest} />
      )}
    </>
  );
}
