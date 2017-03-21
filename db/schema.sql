DROP TABLE IF EXISTS Gallery CASCADE;
DROP TABLE IF EXISTS Images CASCADE;


CREATE TABLE Gallery (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE Images (
  id SERIAL PRIMARY KEY,
  caption text NOT NULL,
  image_url varchar(255) NOT NULL,
  gallery_id INT NOT NULL,
  FOREIGN KEY (gallery_id) REFERENCES Gallery(id)
);
