module Api
  module V1
    module UpdateUserConcern
      extend ActiveSupport::Concern

      def update_user(auth)
        render json: auth, status: :unauthorized and return unless auth[:data]

        uid = auth[:data][:uid]
        user = User.find_by(uid: uid)
        render json: { error: 'ユーザが存在しません' }, status: :not_found and return if user.blank?

        if user.update(user_params)
          render json: user
        else
          render json: user.errors, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.fetch(:user, {}).permit(:name)
      end
    end
  end
end
