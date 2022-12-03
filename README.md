# front-geotag

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Restore

psql template1 -c 'drop database geotag;'
psql template1 -c 'create database geotag with owner geotag;'
psql geotag < geotag.db

## Backup

add run every month

crontab -e

0 0 1 * * sh /home/syldor/src/server-geotag/backup.sh
0 0 8 * * sh /home/syldor/src/server-geotag/backup.sh
0 0 15 * * sh /home/syldor/src/server-geotag/backup.sh
0 0 25 * * sh /home/syldor/src/server-geotag/backup.sh

## AWS

user geotag belongs to the group geotag which has the geotag-bucket-uploads permission which gives the permission to upload to images and backup buckets.

