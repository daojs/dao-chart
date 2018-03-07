import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Story from '../src/story';
import StoryConfig from './story.config';
import '../src/style/index.scss';

storiesOf('Story', module)
  .add('story prototype', () => (
    <Story
      {...StoryConfig}
    />
  ));
