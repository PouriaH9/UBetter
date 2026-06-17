"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

type JalaliDateInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDark: boolean;
  textColor: string;
  accentColor: string;
  hasError?: boolean;
};

export default function JalaliDateInput({
  value,
  onChange,
  placeholder,
  isDark,
  textColor,
  accentColor,
  hasError,
}: JalaliDateInputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = hasError
    ? "#ef4444"
    : focused
      ? accentColor
      : isDark
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.1)";

  return (
    <DatePicker
      value={value || undefined}
      onChange={(date: DateObject | null) => {
        onChange(date ? date.format("YYYY/MM/DD") : "");
      }}
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
      placeholder={placeholder}
      containerClassName="w-full jalali-date-field"
      inputClass="w-full"
      arrow={false}
      editable={false}
      calendarPosition="bottom-center"
      onOpen={() => setFocused(true)}
      onClose={() => setFocused(false)}
      style={{
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        border: `1px solid ${borderColor}`,
        color: textColor,
        borderRadius: "12px",
        padding: "10px 14px",
        fontSize: "13px",
        fontFamily: YK,
        outline: "none",
        width: "100%",
        transition: "border-color 0.2s",
        height: "44px",
        boxSizing: "border-box",
      }}
    />
  );
}
