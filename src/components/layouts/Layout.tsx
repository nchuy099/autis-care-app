import { ReactNode } from "react";
import { SafeAreaView, View, ViewProps } from "react-native";

interface LayoutProps extends ViewProps {
    children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
    return (
        <View className='p-5 flex-1' {...props}>
            {children}
        </View>
    );
};

export default Layout;
