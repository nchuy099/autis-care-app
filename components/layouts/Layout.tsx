import { ReactNode } from "react";
import { Platform, SafeAreaView, View, ViewProps } from "react-native";

interface LayoutProps extends ViewProps {
    children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
    return (
        <SafeAreaView className='flex-1 pt-5' {...props}>
            {children}
        </SafeAreaView>
    );
};

export default Layout;
