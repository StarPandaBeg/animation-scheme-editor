import { PingModule } from "./modules/ping";

type Repository = {
  ping: PingModule;
};

const useRepository = () => {
  const modules: Repository = {
    ping: new PingModule("ping"),
  };

  return { api: modules };
};

export default useRepository;
