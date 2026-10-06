import * as React from "react";

import { HashRouter } from 'react-router-dom';
import QueryProvider from "@providers/QueryProvider.tsx";
import ModalProvider from "@providers/ModalProvider.tsx";

const AppProviders = ({ children }: { children: React.ReactNode }) => (
    <HashRouter>
        <QueryProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </QueryProvider>
    </HashRouter>
)

export default AppProviders;