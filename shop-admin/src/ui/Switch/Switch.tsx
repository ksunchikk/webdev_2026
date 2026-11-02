import styles from "./Switch.module.css";
import { Switch as BaseSwitch } from "@base-ui/react/switch";

type SwitchProps = {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export function Switch({ label, ...props }: SwitchProps) {
  return (
    <label className={styles.label}>
      <BaseSwitch.Root className={styles.root} {...props}>
        <BaseSwitch.Thumb className={styles.Thumb} />
      </BaseSwitch.Root>
      {label}
    </label>
  );
}
