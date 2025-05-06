import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';
import { awsS3 } from '../../config/s3';
import { FOLDERS } from '../../constants/folders';

export const uploadSampleMediaHandler: RequestHandler<
  { sampleId: string },
  SuccessResponse,
  { media_type: 'image' | 'video'; media_name?: string; media_description?: string }
> = async (req, res, next) => {
  // This handler expects files to be uploaded via multer middleware
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files were uploaded',
      data: null
    });
  }

  const files = req.files as Express.Multer.File[];
  
  // Save files to S3
//   await awsS3.saveBucketFiles(FOLDERS.sample || 'samples', ...files);
  
  // Create media records for each file
  const mediaRecords = await Promise.all(files.map(file => 
    Models.SampleMedia.save({
      sample: { sample_id: req.params.sampleId },
      media_type: req.body.media_type || 'image',
      media_url: `${file.filename}`,
      media_name: req.body.media_name || file.originalname,
      media_description: req.body.media_description,
    })
  ));
  
  res.status(201).json({
    success: true,
    message: 'Sample media uploaded successfully',
    data: { mediaIds: mediaRecords.map(media => media.sample_media_id) }
  });
};

export const getSampleMediaHandler: RequestHandler<
  { sampleId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  const media = await Models.SampleMedia.find({
    where: {
      sample: { sample_id: req.params.sampleId }
    }
  });
  
  res.status(200).json({
    success: true,
    message: 'Sample media fetched successfully',
    data: media
  });
};

export const deleteSampleMediaHandler: RequestHandler<
  { mediaId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  const media = await Models.SampleMedia.findOne({
    where: { sample_media_id: req.params.mediaId }
  });
  
  if (media) {
    // Delete from S3 if it exists
    if (media.media_url) {
    //   await awsS3.removeBucketFiles(media.media_url);
    }
    
    // Delete from database
    await Models.SampleMedia.delete({ sample_media_id: req.params.mediaId });
  }
  
  res.status(200).json({
    success: true,
    message: 'Sample media deleted successfully',
    data: null
  });
};
