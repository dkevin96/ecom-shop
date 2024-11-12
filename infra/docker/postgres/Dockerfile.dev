FROM postgres:14

# Copy initialization scripts and ensure correct permissions
COPY server/db/sql/init.sql /docker-entrypoint-initdb.d/01-init.sql
COPY server/db/sql/addproduct.sql /docker-entrypoint-initdb.d/02-addproduct.sql

# Ensure scripts are executable
RUN chmod +x /docker-entrypoint-initdb.d/*

# Set default encoding to UTF8
ENV LANG en_US.utf8