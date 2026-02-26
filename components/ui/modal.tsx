import { Modal, View, Pressable } from "react-native";
import ThemedText from "@/components/shared/ThemedText";
import ThemedPressable from "@/components/shared/ThemedPressable";

export function AppModal({ visible, onClose, children }: any) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/50 justify-center items-center p-4">
                <View className="bg-surface rounded-xl p-6 w-full max-w-md">
                    {children}
                    <ThemedPressable title={"Cerrar"} onPress={onClose} className="mt-4" icon={"car"}/>
                </View>
            </View>
        </Modal>
    );
}
