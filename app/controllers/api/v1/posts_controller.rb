module Api
  module V1
    class PostsController < ApplicationController
      include FirebaseAuthConcern
      before_action :set_auth, only: %i[create update]

      include ListPostsConcern
      def index
        list_posts
      end

      include CreatePostConcern
      def create
        create_post(@auth, post_params)
      end

      private

      def set_auth
        @auth = authenticate_token_by_firebase
      end

      def post_params
        params.fetch(:post, {}).permit(:title, :body)
      end
    end
  end
end
