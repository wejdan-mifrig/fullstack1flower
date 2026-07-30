



CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    role user_role DEFAULT 'user',
    refresh_tokens TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image TEXT,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_menu_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);


CREATE TABLE public.messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    rating INTEGER NOT NULL
        CHECK (rating BETWEEN 1 AND 5),

    comment TEXT NOT NULL
        CHECK (length(trim(comment)) > 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS review_likes (
    id SERIAL PRIMARY KEY,

    review_id INTEGER NOT NULL
        REFERENCES reviews(id)
        ON DELETE CASCADE,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (review_id, user_id)
);





CREATE TYPE order_status AS ENUM (
    'Pending',
    'Accepted',
    'Rejected'
);

CREATE TABLE IF NOT EXISTS orders (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    total_price NUMERIC(10,2) NOT NULL,

    status order_status DEFAULT 'Pending',

    admin_message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE IF NOT EXISTS cart (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    product_id INTEGER NOT NULL
        REFERENCES menu(id)
        ON DELETE CASCADE,

    quantity INTEGER NOT NULL DEFAULT 1
        CHECK(quantity > 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, product_id)

);


CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,

    order_id INTEGER NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

    menu_id INTEGER NOT NULL
        REFERENCES menu(id)
        ON DELETE CASCADE,

    quantity INTEGER NOT NULL DEFAULT 1,

    price NUMERIC(10,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
