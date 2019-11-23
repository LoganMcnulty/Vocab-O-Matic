module.exports = function(sequelize, DataTypes) {
  var Curriculum = sequelize.define("Curriculum", {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    vocabSubject: {
      type: DataTypes.STRING,
      defaultValue: "global"
    },
    listNumber: {
      type: DataTypes.INTEGER
    },
    singleCount: {
      type: DataTypes.INTEGER
    },
    vocabBool: {
      type: DataTypes.BOOLEAN
    },
    timeStamp: {
      type: DataTypes.DATE
    }
  });
  return Curriculum;
};
