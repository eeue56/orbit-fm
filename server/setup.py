#!/usr/bin/env python

from distutils.core import setup
from setuptools import find_packages


setup(name='orbit',
      version='0.0.1',
      description='Collabrtive playlist for parties',
      author='Enalicho',
      author_email='enalicho@gmail.com',
      packages = find_packages(),
      requires=['tornado'],
     )
