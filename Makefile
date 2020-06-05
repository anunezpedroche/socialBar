#!/usr/bin/make -f 

#node-path = /home/aberlanas/bin/node/bin


run:
	@echo " Starting with nodemon "
	/npm run dev

run-react:
	@echo " Starting React "
	/npm run start

create-db:
	@echo " * Create the Database "
	sudo mysql -u root -proot < db/create-db-skel.sql 

populate-db:
	@echo " * [ DB ] : Populate Users "
	#sudo mysql -u root -proot < db/populate-usuarios.sql 
	sudo mysql -u root -proot < db/populate-db.sql 
	#sudo mysql -u root -proot < db/populate-tecnologias.sql 
	#sudo mysql -u root -proot < db/populate-projects.sql 
	#sudo mysql -u root -proot < db/populate-cursos.sql 
	#sudo mysql -u root -proot < db/populate-calificaciones.sql 

install-dep: 
	@echo " * NPM Installing dependence "
	/npm install $(ARGS) --save

