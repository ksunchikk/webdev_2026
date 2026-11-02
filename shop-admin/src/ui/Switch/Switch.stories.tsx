import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta = {
  title: "UI/Switch",
  component: Switch,
  args: {
    label: "Ok!",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const On: Story = { args: { defaultChecked: true } };

export const Off: Story = { args: { defaultChecked: false } };

export const DisabledOff: Story = {
  args: { defaultChecked: false, disabled: true },
};

export const DisabledOn: Story = {
  args: { defaultChecked: true, disabled: true },
};
