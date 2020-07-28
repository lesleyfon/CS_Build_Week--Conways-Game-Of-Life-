import { createContext } from "react";

const ConwayGameContext = createContext();
export const ProviderContext = ConwayGameContext.Provider;
export const ConsumerContext = ConwayGameContext.Consumer;

export default ConwayGameContext;
