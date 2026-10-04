import * as React from "react";

import { BrowserRouter } from 'react-router-dom';
import QueryProvider from "./QueryProvider.tsx";

const AppProviders = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter basename="/green-api-chat">
        <QueryProvider>
            {children}
        </QueryProvider>
    </BrowserRouter>
)

export default AppProviders;