/* eslint-disable no-console */
import fs from 'fs';

import { PRIVATE_KEY_PREFIX, PUBLIC_KEY_PREFIX } from './constants';

const drivelist = require('drivelist');

export const getDrives = async () => {
  const drivesList = await drivelist.list();

  const drives = drivesList.filter(item => item.isUSB && !item.error && item.size > 0);
  const result = drives
    .map((driveItem) => {
      let dir = [];
      const { mountpoints, description } = driveItem;
      const { path } = mountpoints[0] || {};
      const driveLabel = description.includes(path) ? description : `${description} (${path})`; // fix for windows/linux cases

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

      return { path, driveType: rawDriveType || 'emptyDrive', description: driveLabel };
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
