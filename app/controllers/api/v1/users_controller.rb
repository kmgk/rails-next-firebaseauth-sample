module Api
  module V1
    class UsersController < ApplicationController
      include FirebaseAuthConcern
      before_action :set_auth, only: %i[create update]

      include CreateUserConcern
      def create
        create_user(@auth)
      end

      include UpdateUserConcern
      def update
        update_user(@auth)
      end

      private

      def set_auth
        @auth = authenticate_token_by_firebase
      end
    end
  end
end
