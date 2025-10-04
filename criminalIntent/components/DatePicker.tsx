import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import Button from "./Button";
import { stylesFromTheme, useTheme } from "./Theme";

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  style?: any;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  date, 
  onDateChange, 
  style 
}) => {
  const { theme } = useTheme();
  const S = stylesFromTheme(theme);
  const [dateOpen, setDateOpen] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android' && event.type === 'dismissed') {
      setDateOpen(false);
      return;
    }
  };

  return (
    <>
      {/* Date Picker Button */}
      <View style={[{ marginBottom: 16 }, style]}>
        <Button onPress={() => setDateOpen(true)}>
          {date.toDateString().toUpperCase()}
        </Button>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={dateOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDateOpen(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000066",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View
            style={[
              { padding: 16, borderRadius: 12 },
              { backgroundColor: theme.inputBg }
            ]}
          >
            <Text style={[S.text, { fontWeight: "600", marginBottom: 8, textAlign: "center" }]}>
              Pick Date
            </Text>
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              textColor={theme.text}
              onChange={handleDateChange}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 8,
                gap: 12,
              }}
            >
              <Pressable onPress={() => setDateOpen(false)}>
                <Text style={[S.text, { color: theme.tint }]}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DatePicker;