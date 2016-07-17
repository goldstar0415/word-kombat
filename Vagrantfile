Vagrant.configure(2) do |config|
  config.vm.box = "bento/centos-6.7"

  config.vm.network "forwarded_port", guest: 3000, host: 8080
  config.vm.synced_folder "./", "/srv/runtime/word-kombat"
  # config.vm.network "public_network"
  # config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.box_check_update = false

  config.vm.provider "virtualbox" do |vb|
    vb.name = "CentOS-6.7"
    vb.memory = "512"
    vb.gui = false
  end

  config.vm.provision "shell", inline: <<-SHELL
    # Common packages installation
    yum install -y gcc-c++ make cronie vim;
    service crond start;
    chkconfig crond on;
    
    # Postgresql 9.2.17 instalation
    psqlrpm=pgdg-centos92-9.2-2.noarch.rpm
    if [ ! -f $psqlrpm ]; then
      curl -O https://download.postgresql.org/pub/repos/yum/9.2/redhat/rhel-7-x86_64/$psqlrpm;
    fi
    rpm -ivh $psqlrpm;
    yum install -y postgresql92-server;
    echo "psql located in $(which psql)";
    if [ -f $psqlrpm ]; then
      rm -f $psqlrpm;
    fi
    
    # Postgresql configuration
    service postgresql-9.2 initdb;
    chkconfig postgresql-9.2 on;
    service postgresql-9.2 start;
    
    # Postgresql user and permision management
    pghba_conf=/var/lib/pgsql/9.2/data/pg_hba.conf;
    psql_password=postgres;
    user_name=user_name;
    user_password=user_password;
    db_name=db_name;
    sed -i -e 's/peer/trust/g' $pghba_conf;
    service postgresql-9.2 restart;
    psql -U postgres -c "ALTER USER postgres WITH ENCRYPTED PASSWORD '$psql_password';";
    psql -U postgres -c "CREATE USER $user_name WITH ENCRYPTED PASSWORD '$user_password';";
    psql -U postgres -c "CREATE DATABASE $db_name WITH OWNER $user_name;";
    sed -i -e 's/trust/md5/g' $pghba_conf;
    service postgresql-9.2 restart;
    
    # Install Nodejs 6.3.0 and NPM 3.10.3
    curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -;
    yum install -y nodejs;
    echo "Nodejs $(node -v) located in $(which node)";
    echo "Npm $(npm -v) located in $(which npm)";
    
    # Nodemon installation
    npm install -g nodemon supervisor;
  SHELL
end