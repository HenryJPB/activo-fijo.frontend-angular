#mysqldump -u nombredeusuario -p nombre_basededatos > nombredelarchivo.sql
mysqldump -u root -p SUITGEADMIN > SUITGEADMIN.sql

  # Backup
    sudo docker exec mysql-contenedor mysqldump -u root --password=root SUITGEADMIN > dump-SUITGEADMIN-200723.sql 
    
  # Restore
    cat dump-SUITGEADMIN-{fecha}.sql | sudo docker exec -i mysql-contenedor mysql -u root --password=root SUITGEADMIN   # ( eeeeeexiitoooooo al 20-07-2023 👍✔️ )
    
