import { configure as storybookConfigure } from '@storybook/react';
import { configure as enzymeConfigure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

enzymeConfigure({ adapter: new EnzymeAdapter() });

const req = require.context('../stories', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

storybookConfigure(loadStories, module);
