import React from 'react';
import { storiesOf } from '@storybook/react';
import Hello from '../src/component/hello';

storiesOf('Hello', module)
  .add('hello', () => (
    <Hello />
  ));

