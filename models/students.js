module.exports = function(sequelize, DataTypes) {
  var studentRecord = sequelize.define("student_record", {
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    recordID: {
      type: DataTypes.INTEGER
    },
    userID: {
      type: DataTypes.INTEGER
    },
    listNumber: {
      type: DataTypes.INTEGER
    },
    frequencyTracker: {
      type: DataTypes.INTEGER
    },
    vocabSubject: {
      type: DataTypes.STRING,
      defaultValue: "eta"
    },
    email: {
      type: DataTypes.STRING
    },
    smsNumber: {
      type: DataTypes.STRING
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    frequency: {
      type: DataTypes.STRING
    },
    listBool: {
      type: DataTypes.BOOLEAN
    },
    timeStamp: {
      type: DataTypes.DATE
    }
  });
  return studentRecord;
};
