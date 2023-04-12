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

psql template1 -c 'drop database viengmo;'
psql template1 -c 'create database viengmo with owner viengmo;'
psql viengmo < viengmo.db

## Backup

add run every month

crontab -e

0 0 1 * * sh /home/syldor/src/viengmo/backup.sh
0 0 8 * * sh /home/syldor/src/viengmo/backup.sh
0 0 15 * * sh /home/syldor/src/viengmo/backup.sh
0 0 25 * * sh /home/syldor/src/viengmo/backup.sh


## IAM permissions

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::viengmo-media-files/*",
                "arn:aws:s3:::viengmo-db-backups",
                "arn:aws:s3:::viengmo-db-backups/*"
            ]
        }
    ]
}

## AWS

user geotag belongs to the group geotag which has the geotag-bucket-uploads permission which gives the permission to upload to images and backup buckets.

