import {Cathedra, File, UserInformation, User} from "../../database/models";

export default {
  group: {
    cathedra: async (parent: any, args: any, context: any) => {
      try {
        return await Cathedra.findOne({where: {id: parent.cathedra}});
      } catch (error) {
        return {error: "Server Error! Kod(201)"};
      }
    },
    fails: async (parent: any, args: any, context: any) => {
      try {
        const files = await File.findAll({where: {owner: parent.id}});
        return files.map((file: any) => file.path);
      } catch (error) {
        return {error: "Server Error! Kod(202)"};
      }
    },
    people: async (parent: any, args: any, context: any) => {
      try {
        const usersInformation = await UserInformation.findAll({
          where: {group: parent.id}
        });
        return usersInformation.map(async (userInformation: any) => {
          return await User.findOne({where: {id: userInformation.owner}});
        });
      } catch (error) {
        return {error: "Server Error! Kod(203)"};
      }
    }
  },

  groupRes: {
    __resolveType(obj: any, context: any, info: any) {
      if (obj.message || obj.error) {
        return "result";
      }

      if (obj.id) {
        return "group";
      }

      return null;
    }
  }
};