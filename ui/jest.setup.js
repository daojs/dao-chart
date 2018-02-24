/* eslint-disable no-undef */

import { configure as enzymeConfigure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

enzymeConfigure({ adapter: new EnzymeAdapter() });

jest.mock('./.storybook/facade');
