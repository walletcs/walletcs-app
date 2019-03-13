import React from 'react';

import CheckPrivateFlash from '../Account/CheckPrivateFlash';
import CopyKeys from './CopyKeys';
import CheckEmptyFlash from './CheckEmptyFlash';
import Final from './Final';
import StepHandler from '../StepHandler';

const steps = [
  CheckPrivateFlash,
  CopyKeys,
  CheckEmptyFlash,
  Final
]

const Backup = props => (
  <StepHandler {...props} steps={steps} onlyPrivate />
);

export default Backup;
