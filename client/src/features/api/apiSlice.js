import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Projects','ContactRequests'],
    endpoints: (builder) => ({
        
        /* Partie connexion */

        // pour créer un user
        registerUser: builder.mutation({
            query: (credentials) => ({
                url: '/user/register',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Connecte un user
        loginUser: builder.mutation({
            query: ({ email, password }) => ({
               url: '/user/login',
               method: 'POST',
               body: { email, password }
            }), 
        }),
        
        // Deconnecte un user
        logoutUser: builder.mutation({
            query: () => '/user/logout',
        }),

        /* partie gestion du project depuis dashboard */

        // Ajoute un nouveau projet
        addProject: builder.mutation({
            query: (newProject) => ({
                url: '/realisations/add',
                method: 'POST',
                body: newProject,
            }),
            invalidatesTags: ['Projects'],
        }),

        // Met à jour le projet
        updateProject: builder.mutation({
            query: ({ id, ...project }) => ({
                url: `/realisations/${id}`,
                method: 'PUT',
                body: project,
            }),
            invalidatesTags: ['Projects'],
        }),

        // Supprime une image d'un projet
        deleteProjectImage: builder.mutation({
            query: ({ id_realisation, imageUrl }) => ({
                url: `/realisations/${id_realisation}/images`,
                method: 'DELETE',
                body: { imageUrl },
            }),
            invalidatesTags: ['Projects'],
        }),

        // Supprime le projet
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/realisations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Projects'],
        }),

        // Récupère les projets
        getProjects: builder.query({
            query: () => '/realisations',
            providesTags: ['Projects'],
        }),
        
        /* Partie pour le formulaire de la page contact */

        // récupère tous les demandes de contact
        getContactRequests: builder.query({
            query: () => '/contact/requests',
            providesTags: ['ContactRequests'],
        }),

        // supprime une demande de contact
        deleteContactRequest: builder.mutation({
            query: (id) => ({
                url: `/contact/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ContactRequests'],
        }),

        uploadImages: builder.mutation({
            query: (formData) => ({
                url: '/upload',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
}) 

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useGetProjectsQuery,
    useGetContactRequestsQuery,
    useDeleteContactRequestMutation,
    useUploadImagesMutation,
    useDeleteProjectImageMutation,
} = apiSlice 
