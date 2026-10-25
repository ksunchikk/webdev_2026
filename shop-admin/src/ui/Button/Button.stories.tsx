import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { fn } from "storybook/test";

const meta = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Save",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

export const Small: Story = { args: { size: "sm" } };
