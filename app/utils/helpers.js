/* eslint-disable no-console */
import fs from 'fs';

import { PRIVATE_KEY_PREFIX, PUBLIC_KEY_PREFIX } from './constants';

const drivelist = require('drivelist');

export const getDrives = async () => {
  const drivesList = await drivelist.list();

  const drives = drivesList.filter(item => item.isUSB);
  const result = drives
    .map((driveItem) => {
      let dir = [];
      const { mountpoints } = driveItem;
      const { path, label } = mountpoints[0] || {};
      const description = `${path} ${label ? `(${label})` : ''}`;

      if (driveItem.system) {
        return null;
      }

      if (path) {
        try {
          dir = fs.readdirSync(path) || [];
        } catch (error) {
          console.error(error);
        }
      } else {
        return null;
      }

      let rawDriveType;

      if (dir.some(file => file.includes(PUBLIC_KEY_PREFIX))) {
        rawDriveType = 'publicDrive';
      } else if (dir.some(file => file.includes(PRIVATE_KEY_PREFIX))) {
        rawDriveType = 'privateDrive';
      }

      return { path, driveType: rawDriveType || 'emptyDrive', description };
    })
    .filter(f => !!f);

  return result;
};

export const writeFile = (path, data, options = {}) => {
  let fd;

  try {
    const dataToWrite = options.txt ? data : JSON.stringify(data);
    fd = fs.openSync(path, 'wx+');
    fs.writeFileSync(path, dataToWrite, { flag: 'rs+' });
  } catch (error) {
    console.error(error);
  } finally {
    fs.closeSync(fd);
  }
};

export const getTransactionType = (trObj) => {
  if (!trObj.transaction.data) {
    return 'BTC';
  }

  return trObj.contract ? '=>' : 'ETH';
};
