import * as React from "react";

import { BrowserRouter } from 'react-router-dom';
import QueryProvider from "@providers/QueryProvider.tsx";
import ModalProvider from "@providers/ModalProvider.tsx";

const AppProviders = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter basename="/green-api-chat">
        <QueryProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </QueryProvider>
    </BrowserRouter>
)

export default AppProviders;