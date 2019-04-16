import fs from 'fs';

import { PRIVATE_KEY_PREFIX, PUBLIC_KEY_PREFIX } from './constants';

const drivelist = require('drivelist');

export const getDrives = async () => {
  const drivesList = await drivelist.list();
  const drives = drivesList.filter(item => item.busType === 'USB');
  const result = {};

  drives
    .map(driveItem => {
      let dir = [];
      const { path } = driveItem.mountpoints[0] || {};

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

      return { path, driveType: rawDriveType || 'emptyDrive' };
    })
    .filter(f => !!f)
    .forEach(d => {
      result[d.driveType] = d.path;
    });

  return result;
};

export const writeFile = (path, data) => {
  let fd;

  try {
    fd = fs.openSync(path, 'wx+');
    fs.writeFileSync(path, data, { flag: 'rs+' });
  } catch (error) {
    console.error(error);
  } finally {
    fs.closeSync(fd);
  }
};

export const getTransactionType = transaction => {
  if (!transaction.data) {
    return 'BTC';
  }

  return transaction.contract ? '=>' : 'ETH';
};
