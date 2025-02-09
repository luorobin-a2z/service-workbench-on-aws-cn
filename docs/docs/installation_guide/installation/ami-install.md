---
id: ami-install
title: Installing AMIs
sidebar_label: Installing AMIs
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can install Service Workbench either by creating and configuring an EC2 instance or by creating a Cloud9 instance. This section describes the steps to install Service Workbench by using either of the two options.

### Installing AMIs for EC2 Workspace

In order to use EC2-based Workspaces, you must ﬁrst install EC2 AMIs for these Workspaces. This process may be run in parallel while `environment-deploy.sh` is running. To run both simultaneously, open another SSH or SSM session to your EC2 instance.
1. Build AMIs for EC2-based workspaces. This takes up to 15 minutes and may run in parallel with the main install script.

     + Install packer from the root of your home directory:     
           `wget https://releases.hashicorp.com/packer/1.6.2/packer_1.6.2_linux_amd64.zip`    
           `unzip packer_1.6.2_linux_amd64.zip`     
     For more information about packer installation, refer to the [README](https://github.com/awslabs/service-workbench-on-aws/blob/b20208099d5acf51816ee4efd5b5bb3bf6d22fc8/addons/addon-base-raas/packages/serverless-packer/README.md).
     + Change to the directory containing the machine image source and build the AMIs. Ensure that the environment variable `STAGE_NAME` has been set before running this command. 
2. Verify that the AMIs have been created. In the Service Workbench `/main/solutions/machine-images` directory:

      `pnpx sls build-image -s ${STAGE_NAME}`

In the Amazon EC2 service console, select AMI in the left-hand navigation. You should see AMIs for EC2-LINUX, EC2-RSTUDIO, EC2-WINDOWS, and Amazon EMR.

<img src={useBaseUrl('img/deployment/installation/AMI.png')} />

**Warning**: Each AMI build results in a new set of AMIs.
