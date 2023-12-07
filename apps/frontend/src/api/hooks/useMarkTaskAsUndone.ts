import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const markTaskAsUndone = async (_id?: string) => {
  await axiosInstance.patch(`${apiConfig.updateTaskStatus.endpoint}${_id}`, {
    done: false,
  });
};

export const useMarkTaskAsUndone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id?: string) => markTaskAsUndone(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['taskById'] });
    },
    networkMode: 'offlineFirst',
  });
};
