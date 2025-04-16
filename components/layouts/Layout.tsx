import { ReactNode } from "react";
import { Platform, SafeAreaView, View, ViewProps } from "react-native";

interface LayoutProps extends ViewProps {
    children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
    return (
        <SafeAreaView className='flex-1' style={{ paddingTop: Platform.OS === 'android' ? 25 : 0 }} {...props}>
            {children}
        </SafeAreaView>
    );
};

export default Layout;
