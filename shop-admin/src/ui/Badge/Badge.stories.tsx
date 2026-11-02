import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  args: {
    children: "Ok!",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Warning: Story = { args: { tone: "warning" } };

export const Error: Story = { args: { tone: "error" } };

export const Success: Story = { args: { tone: "success" } };
