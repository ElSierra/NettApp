import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "../../types/general";

export default function CustomButton({
  children,
  clickHandler,
  classnames,
  variant,
}: ButtonProps) {
  const classNames =
    variant === "small"
      ? `w-36 bg-secondary p-3 rounded-lg ${classnames}`
      : `bg-secondary p-3 rounded-lg ${classnames}`;

  return (
    <>
      {variant === "small" ? (
        <TouchableOpacity
          onPress={clickHandler}
          activeOpacity={0.7}
          className={classNames}
        >
          <Text className="text-white font-semibold text-center text-base">
            {children}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={clickHandler}
          activeOpacity={0.4}
          className={classNames}
        >
          <Text className="text-white font-bold text-center text-xl">
            {children}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
