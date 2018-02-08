import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import UploadModal from './UploadModal';
import UploadButton from './UploadButton';
import UploadButton2 from './UploadButton2';


storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
  
storiesOf('Modal', module)
  .add('Modal for image upload', () => <UploadModal />)
  .add('Upload button 1', () => <UploadButton />)
  .add('Upload button 2', () => <UploadButton2 />)