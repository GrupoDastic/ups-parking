import { Modal, View, Pressable } from "react-native";
import ThemedText from "@/components/shared/ThemedText";

export function AppModal({ visible, onClose, children }: any) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/50 justify-center items-center p-4">
                <View className="bg-surface rounded-xl p-6 w-full max-w-md">
                    {children}
                    <Pressable onPress={onClose} className="mt-4 self-end">
                        <ThemedText className="text-primary font-semibold">Cerrar</ThemedText>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
