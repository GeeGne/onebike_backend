'use strict';
/* npx sequelize-cli migration:generate --name add_new_column_to_users */
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address_details: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      second_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      notes: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM('user', 'admin', 'owner'),
        allowNull: false,
        defaultValue: 'user'
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    })

    await queryInterface.createTable('Banners', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      alt: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })

    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      }, 
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      title_en: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      title_ar: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
      discount: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      face: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:'front'
      }, 
      brand: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    })

    await queryInterface.createTable('SocialLinks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instagram: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      whatsApp: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });

  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Banners');
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('SocialLinks');
  }
};
