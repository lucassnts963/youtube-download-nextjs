import React, { createContext, useContext, useState } from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface Result {
  videoDetails: IVideoDetails | undefined;
  formats: IFormat[];
}

type IContextType = {
  data: Result | undefined;
  updateResultState: (newResult: Result) => void;
};

const defaultValue = {
  data: {} as Result | undefined,
  updateResultState: (newResult: Result) => {},
} as IContextType;

const ResultContext = createContext(defaultValue);

export function ResultContextProvider({ children }: Props) {
  const [result, setResult] = useState<Result | undefined>();
  return (
    <ResultContext.Provider
      value={{
        data: result,
        updateResultState: (newResult: Result) => {
          setResult(newResult);
        },
      }}
    >
      {children}
    </ResultContext.Provider>
  );
}

export function useResultContext() {
  return useContext(ResultContext);
}
