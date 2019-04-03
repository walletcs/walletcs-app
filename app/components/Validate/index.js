import React from 'react';

import CheckPrivateFlash from '../Account/CheckPrivateFlash';
import CheckPublicFlash from '../Account/CheckPublicFlash';
import DetectPublicAddresses from './DetectPublicAddresses';
import DetectPrivateKeys from './DetectPrivateKeys';
import Final from './Final';
import StepHandler from '../StepHandler';

const steps = [
  CheckPrivateFlash,
  DetectPrivateKeys,
  CheckPublicFlash,
  DetectPublicAddresses,
  Final
];

const Validate = props => <StepHandler {...props} steps={steps} />;

export default Validate;
