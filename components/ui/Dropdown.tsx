import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  FlatList,
} from "react-native";
import {MoreVertical} from "lucide-react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DropdownItem {
  key: string;
  label: string;
  disabled?: boolean;
  divider?: boolean;
  icon?: React.ReactNode;
  danger?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  align?: "start" | "end";
  dotColor?: string;
  triggerSize?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  align = "end",
  dotColor = "#6b7280",
  triggerSize = 36,
}) => {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const buttonRef = useRef<View>(null);
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-6)).current;

  const measureButton = useCallback(() => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
    });
  }, []);

  const openMenu = () => {
    measureButton();
    setOpen(true);
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 0, duration: 110, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -6, duration: 110, useNativeDriver: true }),
    ]).start(() => setOpen(false));
  };

  const handleSelect = (item: DropdownItem) => {
    if (item.disabled || item.divider) return;
    onSelect?.(item);
    closeMenu();
  };

  const MENU_WIDTH = 180;
  const menuLeft =
    align === "end"
      ? layout.x + layout.width - MENU_WIDTH
      : layout.x;
  const menuTop = layout.y + layout.height + 4;

  return (
    <View>
      {/* ── Trigger ── */}
      <View ref={buttonRef} collapsable={false}>
        <TouchableOpacity
          onPress={open ? closeMenu : openMenu}
          activeOpacity={0.6}
          className="p-1"
        >
          <MoreVertical size={16} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* ── Menu ── */}
      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={closeMenu}
          activeOpacity={1}
        />

        {/* Menu card */}
        <Animated.View
          style={{
            position: "absolute",
            top: menuTop,
            left: menuLeft,
            width: MENU_WIDTH,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            backgroundColor: "#fff",
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            paddingVertical: 4,
            // Shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <FlatList
            data={items}
            keyExtractor={(item) => item.key}
            scrollEnabled={false}
            renderItem={({ item }) => {
              // Divider
              if (item.divider) {
                return (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#e5e7eb",
                      marginVertical: 4,
                    }}
                  />
                );
              }

              const isDisabled = !!item.disabled;
              const isDanger   = !!item.danger;

              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  disabled={isDisabled}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}
                >
                  {item.icon && (
                    <View style={{ marginRight: 10, width: 18, alignItems: "center" }}>
                      {item.icon}
                    </View>
                  )}
                  <Text
                    style={{
                      fontSize: 14,
                      color: isDisabled
                        ? "#9ca3af"
                        : isDanger
                        ? "#dc2626"
                        : "#1f2937",
                      opacity: isDisabled ? 0.6 : 1,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
      </Modal>
    </View>
  );
};



// ─── Usage Example ────────────────────────────────────────────────────────────
//
// import ThreeDotsDropdown, { DropdownItem } from "./ThreeDotsDropdown";
//
// const MENU: DropdownItem[] = [
//   { key: "edit",     label: "Edit" },
//   { key: "duplicate",label: "Duplicate" },
//   { key: "share",    label: "Share" },
//   { key: "div1",     label: "", divider: true },
//   { key: "archive",  label: "Archive" },
//   { key: "div2",     label: "", divider: true },
//   { key: "delete",   label: "Delete", danger: true },
// ];
//
// <ThreeDotsDropdown
//   items={MENU}
//   align="end"
//   onSelect={(item) => console.log(item.key)}
// />