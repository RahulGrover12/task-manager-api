export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed"),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "Cascade",
        onUpdate: "Cascade",
      },
    },
    {
      tableName: "Tasks",
      timestamps: true,
      paranoid: true,
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Task;
};
