import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SearchBar from '../app/components/SearchBar';
import '../app/globals.css';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'searched' },
    initialValue: {
      control: 'text',
      description: 'Initial value in the search input',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

/**
 * Default empty search bar
 */
export const Default: Story = {
  args: {
    onSearch: () => {},
    initialValue: '',
  },
};

/**
 * Search bar with initial value
 */
export const WithInitialValue: Story = {
  args: {
    onSearch: () => {},
    initialValue: 'margarita',
  },
};

/**
 * Search bar with a long query
 */
export const LongQuery: Story = {
  args: {
    onSearch: () => {},
    initialValue: 'strawberry banana smoothie cocktail',
  },
};

